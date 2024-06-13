import antlr4 from 'antlr4';

import { FEELLexer, FEELParser, ThrowErrorAndFailListener } from 'jdmn-js-runtime'

const parser = function (input) {
    const chars = new antlr4.InputStream(input);

    const feelLexer = new FEELLexer(chars);
    feelLexer.removeErrorListeners();
    feelLexer.addErrorListener(ThrowErrorAndFailListener.INSTANCE);

    const tokens = new antlr4.CommonTokenStream(feelLexer);

    const feelParser = new FEELParser(tokens);
    feelParser.buildParseTrees = false;
    feelParser.removeErrorListeners();
    feelParser.addErrorListener(ThrowErrorAndFailListener.INSTANCE);

    return feelParser;
}

export function inputEntry(input) {
    parser(input).unaryTestsRoot;
}

export function outputEntry(input) {
    parser(input).expressionRoot;
}