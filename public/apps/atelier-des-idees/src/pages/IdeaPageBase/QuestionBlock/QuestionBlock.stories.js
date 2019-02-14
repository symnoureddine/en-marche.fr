import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuestionBlock from '.';

const question = {
    id: 'problem',
    label: 'Constat',
    question: 'Quel problème souhaitez-vous résoudre ?',
    canCollapse: false,
    placeholder: 'Expliquez le problème que vous identifiez et espérez pouvoir remédier.',
};

storiesOf('QuestionBlock', module)
    .addParameters({ jest: ['QuestionBlock'] })
    .add('default', () => (
        <QuestionBlock onTextChange={action('question block text change')} {...question} nbQuestion={1} />
    ))
    .add('with initial content', () => (
        <QuestionBlock
            {...question}
            onTextChange={action('question block text change')}
            nbQuestion={1}
            initialContent="<p><strong>Lorem</strong> ipsum</p>"
        />
    ))
    .add('with collapse', () => (
        <QuestionBlock
            {...question}
            onTextChange={action('question block text change')}
            canCollapse={true}
            nbQuestion={1}
        />
    ));
