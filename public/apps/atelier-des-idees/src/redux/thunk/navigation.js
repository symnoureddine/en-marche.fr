import { ideaStatus } from '../../constants/api';
import { fetchIdeas, fetchIdea, fetchUserIdeas, fetchUserContributions } from './ideas';
import { setIdeas } from '../actions/ideas';
import { fetchConsultationPinned } from './pinned';
import { fetchReports } from './reports';
import { fetchAuthUser } from './auth';
import { fetchGuidelines } from './currentIdea';
import { fetchStaticData } from './static';
import { setCurrentIdea } from '../actions/currentIdea';

export function initApp() {
    return dispatch =>
        Promise.all([
            dispatch(fetchAuthUser()).then(() => dispatch(fetchUserIdeas())),
            dispatch(fetchStaticData()),
            dispatch(fetchUserContributions()),
        ]);
}

export function initHomePage() {
    const params = {
        page_size: 5,
        'order[publishedAt]': 'DESC',
    };
    return dispatch =>
        Promise.all([
            // consultation pinned
            dispatch(fetchConsultationPinned()),
            // ideas
            // flush ideas reducer
            dispatch(setIdeas()),
            dispatch(fetchIdeas(ideaStatus.FINALIZED, params)),
            dispatch(fetchIdeas(ideaStatus.PENDING, params)),
            // reports
            dispatch(fetchReports()),
        ]);
}

export function initIdeaPageBase() {
    return dispatch => dispatch(fetchGuidelines());
}

export function initIdeaPage(id) {
    return async dispatch => {
        // reset current idea
        dispatch(setCurrentIdea());
        return dispatch(fetchIdea(id)).then(() => dispatch(initIdeaPageBase()));
    };
}

export function initCreateIdeaPage() {
    return dispatch => {
        dispatch(initIdeaPageBase());
    };
}
