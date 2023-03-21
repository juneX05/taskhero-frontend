export class Validator {
    static #errors = {}
    static #data = {}

    static make(data, validator_rules, validator_messages) {
        this.#data = data

        for (const [key, rules] of Object.entries(validator_rules)) {
            this.#processRules(key, rules)
        }

        let messages = {}
        for (const [key, failed_rule] of Object.entries(this.#errors)) {
            let validator_message = validator_messages[key];
            if (validator_message !== undefined) {
                messages[key] = validator_message[failed_rule]
            }
        }

        this.#errors = {}
        return messages;
    }

    static #processRules(key, rules) {

        for (const [rule, value] of Object.entries(rules)) {
            if (rule === 'required') {
                let result = this.#required(key)
                if (result) this.#errors[key] = 'required'; return false;
            }
        }
    }

    static #required(key, type = 'string') {
        if (type === 'string') {
            return (this.#data[key] === "" || this.#data[key] === null || this.#data[key] === undefined);
        }

        if (type === 'array') {
            return (this.#data[key] === null || this.#data[key] === undefined || this.#data[key].length === 0)
        }
    }

    static #max(value) {
        return data.length > value;
    }
}