const selectors = {
  number: ".js-phone-number",
  code: ".js-phone-code",
  country: ".js-phone-country"
};

export default function field(form, conditions) {
  const number = form.querySelector(selectors.number);
  const code = form.querySelector(selectors.code);
  const country = form.querySelector(selectors.country);

  function validate(field) {
    if (!field.value.trim()) {
      return "empty";
    }
    const match = field.value.match(/[0-9\s]+/);
    if (!match) {
      return "incorrect character";
    }
    if (match[0] === field.value) {
      return false;
    }
    return "incorrect character";
  }

  let numberError = validate(number);
  let codeError = validate(code);
  let error = numberError || codeError;
  let touched = false;
  let value = {
    number: number.value,
    code: code.value
  };

  let subscribers = [];
  function subscribe(callback) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(item => item !== callback);
    };
  }

  function notify() {
    subscribers.forEach(callback => {
      callback({
        error,
        touched,
        value,
        fields: { number, code, country }
      });
    });
  }

  number.addEventListener("keyup", () => {
    touched = true;
    numberError = validate(number);
    error = numberError || codeError;
    value.number = number.value;
    notify();
  });

  code.addEventListener("keyup", () => {
    touched = true;
    codeError = validate(code);
    error = numberError || codeError;
    value.code = code.value;
    notify();
  });

  return {
    subscribe,
    error,
    touched,
    value,
    validate: () => {
      numberError = validate(number);
      codeError = validate(code);
      error = numberError || codeError;
      return {
        error,
        touched,
        value,
        fields: { number, code, country }
      };
    },
    prepareToSubmit: () => {
      touched = true;
    },
    fields: { number, code, country }
  };
}
