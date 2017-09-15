import expect from 'expect'
import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import connect from '../src';

describe('React', () => {
    describe('connect', () => {
        class FormModel {
            static displayName = `FormModel`;
        }

        class Passthrough extends Component {
            render() {
                return <div />
            }
        }

        it('should receive the form in the component', () => {
            const form = new FormModel();

            @connect(form)
            class Container extends Component {
                render() {
                    return <Passthrough {...this.props} />
                }
            }

            const tree = TestUtils.renderIntoDocument(
                <Container />
            );

            const container = TestUtils.findRenderedComponentWithType(tree, Container)

            expect(container.form).toBe(form);
        });
    });
});