export default class TextHelperUtils {
    shortedText(value: string, charactersNumber: number) {
        const symbols = value.split("");
        let result = "";
        for (const [index, value] of symbols.entries()) {
            if (index <= charactersNumber) {
                result += value;
            }
        }
        return `${result}...`;
    }
}
