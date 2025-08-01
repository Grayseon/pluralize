"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = void 0;
exports.stitch = stitch;
exports.pluralize = pluralize;
exports.and = and;
const rawPlurals = __importStar(require("./plurals.json"));
exports.s = Symbol("pluralize");
function stitch(strings, values) {
    return strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");
}
function pluralize(strings, ...values) {
    const plurals = rawPlurals;
    if (!values.includes(exports.s)) {
        throw new TypeError("Pluralization is unnecessary; it was never called.");
    }
    let shouldPluralize = true;
    const updatedStrings = [...strings];
    const updatedValues = values.map((value, i) => {
        if (value === exports.s) {
            if (!shouldPluralize)
                return "";
            const segmentBefore = updatedStrings[i];
            const match = segmentBefore.match(/([A-Za-z]+)\s*$/);
            const rawWord = match?.[1] ?? "";
            const base = rawWord.toLowerCase();
            let replacement = plurals[base];
            if (!replacement) {
                if (/[ctp]h$/i.test(base)) {
                    replacement = base + "es";
                }
                else if (/y$/i.test(base)) {
                    replacement = base.slice(0, -1) + "ies";
                }
                else {
                    replacement = base + "s";
                }
            }
            updatedStrings[i] = segmentBefore.slice(0, -rawWord.length) + replacement;
            return "";
        }
        const numeric = Number(value);
        if (!isNaN(numeric)) {
            shouldPluralize = numeric !== 1;
        }
        return value;
    });
    return stitch(updatedStrings, updatedValues);
}
function and(values, separator = ", ", conjunction = ", and ") {
    if (values.length <= 1)
        return values.join("");
    return values.slice(0, -1).join(separator) + conjunction + values.at(-1);
}
