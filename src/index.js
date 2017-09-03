import React, { Component } from 'react';
import FormModel from 'form-model';

import omit from 'lodash/omit';

export default (formModelSchema, mapToForm, mapFromForm) => WrappedComponent => class Connector extends Component {
    static displayName = `connector(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    static WrappedComponent = WrappedComponent;

    constructor(props) {
        super();
        const { data } = props;

        this.form = new FormModel(formModelSchema, this.update);
        this.mapper = {
            toForm: mapToForm,
            fromForm: mapFromForm
        };

        this.form.setData(this.mapper.toForm(data));
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;

        if (data !== this.props.data) {
            this.form.setData(this.mapper.toForm(data));
        }
    }

    validateField = () => {
        const isValid = this.form.validate();

        this.forceUpdate();

        return isValid;
    };

    handleSubmit = () => {
        const { onSubmitSuccess, onSubmitFailed } = this.props;

        if (this.form.validate()) {
            onSubmitSuccess(this.mapper.fromForm(this.form.getData()));
        } else if (onSubmitFailed) {
            onSubmitFailed(this.form.getInvalidFields());
        }

        this.update();
    }

    handleReset = (shouldValidate = false) => {
        const { data } = this.props;

        this.form._resetInvalidFields();
        this.form.setData(this.mapper.toForm(data));

        if (shouldValidate) {
            this.form.validate();
        }

        this.forceUpdate();
    }

    update = () => {
        this.forceUpdate();
    }

    render() {
        return (
            <WrappedComponent
                {...omit(this.props, ['onSubmitSuccess', 'onSubmitFailed', 'data'])}
                form={this.form.getData()}
                invalidFields={this.form.getInvalidFields()}
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                validate={this.validateField}
            />
        );
    }
};