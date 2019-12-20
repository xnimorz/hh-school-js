import makePhone from "./phone";

// Компонент самой формы. 
// Общая логика валидации всей формы

const form = document.querySelector(".js-form");
const submit = form.querySelector(".js-submit");
const phone = makePhone(form);

const state = {
  invalidFields: new Set(["phone"])
};

function showValidation({ touched, error, value }) {
  state.phone = value;
  const { number, code, country } = phone.fields;
  if (touched && error) {
    number.classList.add("input_error");
    code.classList.add("input_error");
    country.classList.add("input_error");

    state.invalidFields.add("phone");
    return;
  }

  state.invalidFields.remove("phone");
  number.classList.remove("input_error");
  code.classList.remove("input_error");
  country.classList.remove("input_error");
}

const unsubscribe = phone.subscribe(showValidation);

submit.addEventListener("click", e => {
  e.preventDefault();
  phone.prepareToSubmit();
  const state = phone.validate();
  if (error) {
    showValidation(state);
  }
});
