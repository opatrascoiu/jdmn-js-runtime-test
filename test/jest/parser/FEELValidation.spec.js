import antlr4 from 'antlr4';
import { FEELLexer, FEELParser, ThrowErrorAndFailListener } from 'jdmn-js-runtime';

import { inputEntry, outputEntry } from "../../../web/FEELValidation.js";

// lexer
function returnToken(input) {
    // Make lexer
    const chars = new antlr4.InputStream(input);
    const feelLexer = new FEELLexer(chars);
    feelLexer.removeErrorListeners();
    feelLexer.addErrorListener(ThrowErrorAndFailListener.INSTANCE);

    // Invoke next token
    return feelLexer.nextToken()
};

function validateToken(input, type, text, message) {
    if (message) {
        expect(returnToken(input)).toThrow(new Error(message));
    } else {
        const token = returnToken(input);
        expect(token.type).toBe(type);
        expect(token.text).toBe(text);
    }
};

// parser
const validateInputEntry = function (input, message) {
    validate(inputEntry, input, message);
};

const validateOutputEntry = function (input, message) {
    validate(outputEntry, input, message);
};

const validate = function (v, input, message) {
    if (message) {
        expect(() => v(input)).toThrow(new Error(message));
    } else {
        expect(() => v(input)).not.toThrow();
    }
};

// tests
describe("grammar", () => {
    it("feel lexer works", () => {
        // literals
        validateToken("12", FEELLexer.NUMBER, "12");
        validateToken("\"some text\"", FEELLexer.STRING, "\"some text\"");
    });

    it("feel parser works", () => {
        // literals
        validateInputEntry("12");
        validateInputEntry("\"some text\"");
        validateInputEntry("< 12");

        validateOutputEntry("12");
        validateOutputEntry("\"some text\"");
    });
});