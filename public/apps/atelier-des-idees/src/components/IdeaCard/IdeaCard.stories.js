import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IdeaCard from '.';
import icn_76px_education from './../../img/icn_76px_education.svg';

const props = {
    uuid: '0000',
    author: {
        first_name: 'Jean-Michel',
        last_name: ' Français',
    },
    author_category: 'COMMITTEE',
    created_at: new Date().toISOString(),
    comments_count: 122,
    contributors_count: 4,
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sapien eu orci congue sollicitudin. Sed malesuada nisi sed diam tristique, ullamcorper fermentum massa euismod. Vivamus a augue vitae nibh scelerisque…',
    themes: [{ name: 'Education', thumbnail: { icn_76px_education } }, { name: 'Droits civiques', thumbnail: null }],
    category: { name: 'Education', enabled: true },
    name: 'Réduire le nombre d’élèves dans les classes dans les quartiers défavorisés',
    votes_count: {
        important: 10,
        feasible: 20,
        innovative: 30,
        total: 60,
        my_votes: ['feasible', 'important'],
    },
    days_before_deadline: 18,
    status: 'PENDING',
};

storiesOf('IdeaCard', module)
    .addParameters({ jest: ['IdeaCard'] })
    .add('default', () => <IdeaCard {...props} onVote={action('Vote')} />)
    .add('PENDING', () => <IdeaCard {...props} status="PENDING" onVote={action('Vote')} />)
    .add('FINALIZED', () => <IdeaCard {...props} status="FINALIZED" onVote={action('Vote')} />)
    .add('with nickname', () => (
        <IdeaCard {...props} onVote={action('Vote')} author={{ ...props.author, nickname: 'bgdu06' }} />
    ));
