import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import deleteIcn from '../../../img/icn_state_delete.svg';

function DeleteIdeaModal(props) {
    return (
        <div className="delete-idea-modal">
            <img src={deleteIcn} />
            <h1 className="delete-idea-modal__title">Confirmer la suppression ?</h1>
            <p className="delete-idea-modal__subtitle">Êtes-vous certain(e) de vouloir supprimer cette proposition ?</p>
            <div className="delete-ideal-modal__actions">
                <Button label="Supprimer" mode="secondary" onClick={props.onConfirmDelete} />
                <Button label="Annuler" mode="tertiary" onClick={props.closeModal} />
            </div>
        </div>
    );
}

DeleteIdeaModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onConfirmDelete: PropTypes.func.isRequired,
};

export default DeleteIdeaModal;
