// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import * as sound from "sound-play";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "moshkel-dari" is now active!');

  vscode.window.showInformationMessage("Hello World from moshkel-dari!");

  const tsDignosticCollection =
    vscode.languages.createDiagnosticCollection("typescript");
  context.subscriptions.push(tsDignosticCollection);

  vscode.workspace.onDidSaveTextDocument((document) => {
    if (
      document.languageId === "typescript" ||
      document.languageId === "typescriptreact"
    ) {
      checkForErrors(document);
    }
  });

  function checkForErrors(document: vscode.TextDocument) {
    const diagnostic = vscode.languages.getDiagnostics(document.uri);
    const tsDiagnostic = diagnostic.filter((diag) => diag.source === "ts");
    if (tsDiagnostic.length) {
      const path = context.asAbsolutePath("sounds/error.mp3");
      sound.play(path).catch((err) => {
        vscode.window.showErrorMessage("can't play moshkel dari!");
      });
    }
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
