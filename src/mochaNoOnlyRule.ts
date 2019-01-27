import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {

  public static metadata: Lint.IRuleMetadata = {
    ruleName: "mocha-no-only",
    description: "Do not use Mocha *.only methods",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: [true],
    rationale: Lint.Utils.dedent`
        Mocha allows you to run specific single test using only() methods.
        It could be dangerous because other tests get disabled.`,
    type: "maintainability",
    typescriptOnly: false,
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new MochaNoOnlyWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class MochaNoOnlyWalker extends Lint.RuleWalker {
  private badTexts = ["it.only", "specify.only", "context.only", "describe.only"];

  public visitCallExpression(node: ts.CallExpression) {
    const sinonReturnsExpression = node.expression;

    if (sinonReturnsExpression.kind === ts.SyntaxKind.PropertyAccessExpression) {
      if (node.arguments.length === 2) {
        if (node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
          if (node.arguments[1].kind === ts.SyntaxKind.FunctionExpression ||
            node.arguments[1].kind === ts.SyntaxKind.ArrowFunction) {
              const text = node.expression.getText();
              const matchingBadText = this.badTexts.find((badText) => badText === text);
              if (matchingBadText) {
                this.addFailureAtNode(node, `Do not use ${matchingBadText} method`);
              }
          }
        }
      }
    }

    super.visitCallExpression(node);
  }
}
