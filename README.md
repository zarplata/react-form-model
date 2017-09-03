# react-form-model

It adaptation [Form-Model](https://github.com/zarplata/form-model) to React

```javascript
// File: my-form.js

import React, { Component } from 'react';
import formModelConnector from 'react-form-model';

class Input extends Component {
    handleChange = (e) => {
        this.props.onChange(e.currentTarget.value);
    }

    render() {
        const { value, type onChange, isError, errorMessage } = this.props;

        return (
            <div>
                <label>{label}</label>
                <input
                    type={type}
                    className={isError ? 'error' : ''}
                    value={value}
                    onChange={onChange}
                />
                {isError && (
                    <div className="error">
                        {errorMessage}
                    </div>
                )}
            </div>
        );
    }
}

class MyForm extends Component {
    render() {
        const { form, onSubmit, onReset, invalidFields, validate } = this.props;
        const { name, email } = form.fields;

        // invalidFields - it all invalid fields
        // validate - function to start validation and return boolean

        return (
            <Form onSubmit={onSubmit}>
                <div>
                    <Input
                        label="Name"
                        type="text"
                        value={name.value}
                        onChange={name.handleChange}
                        isError={name.isError}
                        errorMessage={name.errorMessage}
                    />

                    <Input
                        label="Name"
                        type="text"
                        value={email.value}
                        onChange={email.handleChange}
                        isError={email.isError}
                        errorMessage={email.errorMessage}
                    />
                </div>

                <div>
                    <submit>
                        Eeee, go
                    </submit>
                    <button onClick={onReset}>
                        Reset
                    </button>
                </div>
            </Form>
        );
    }
}

const schema = () => {
    return {
        fields: {
            name: {
                validate: (field) => { return !field.value }
                errorMessage: 'Plz put it field'
                require: true
            },
            email: {
                validate: (field) => { return !field.value }
                errorMessage: 'Email don\'t need but, if you write, write to good!'
                require: false
            }
        }
    };
}

const mapDataToForm = (data) => {
    return {
        fields: {
            name: {
                value: data.name
            },
            email: {
                value: data.email
            }
        }
    }
};

const mapDataFromForm = (formData) => {
    return {
        name: formData.fields.name.value,
        email: formData.fields.email.value
    }
};

export default formModelConnector(schema, mapDataToForm, mapDataFromForm)(MyForm);
```

// And your wrapper, if need.

```javascript
import React, { Component } from 'react';

import MyForm from './my-form.js';

const defaultData = {
    name: 'Sexy Alex'
};

class MyWraper extends Component {
    handleSubmitSuccess(data) {
        // code
    }

    handleSubmitFailed(invalidFields) {
        // code
    }

    render() {
        return (
            <MyForm
                data={defaultData}
                onSubmitSuccess={this.handleSubmitSuccess}
                onSubmitFailed={this.handleSubmitFailed}
            />
        );
    }
}

export default MyWraper;
```
