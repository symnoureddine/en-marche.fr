import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SecondForm from '.';

const props = {
    authorOptions: [{ value: 'alone', label: 'Non' }, { value: 'committee', label: 'Oui' }],
    committeeOptions: [{ value: 'comittee_1', label: 'Comité 1' }, { value: 'comittee_2', label: 'Comité 2' }],
    difficultiesOptions: [{ value: 'juridique', label: 'Juridique' }, { value: 'finance', label: 'Finance' }],
};

storiesOf('PublishIdeaFormModal/SecondForm', module)
    .addParameters({ jest: ['SecondForm'] })
    .add('default', () => (
        <SecondForm {...props} onSubmit={action('second form')} saveStateFormOnChange={action('save second form')} />
    ))
    .add('without author', () => (
        <SecondForm
            {...props}
            onSubmit={action('second form')}
            saveStateFormOnChange={action('save second form')}
            canSelectAuthor={false}
        />
    ));
