<?php

namespace AppBundle\EntityListener;

use AppBundle\Entity\Adherent;
use AppBundle\Entity\IdeasWorkshop\Idea;
use Doctrine\ORM\Event\PreUpdateEventArgs;

class AdherentListener
{
    private $ideaRepository;
    private $mandatesBeforeUpdate;
    private $tagsBeforeUpdate;

    public function preUpdate(Adherent $adherent, PreUpdateEventArgs $preUpdateEventArgs): void
    {
        $this->ideaRepository = $preUpdateEventArgs->getEntityManager()->getRepository(Idea::class);
        if (!$preUpdateEventArgs->hasChangedField('tags') && !$preUpdateEventArgs->hasChangedField('mandates')
        ) {
            return;
        }

        dump($preUpdateEventArgs->getEntityChangeSet());
//        dump($preUpdateEventArgs->getOldValue('tags') == $preUpdateEventArgs->getNewValue('tags'));
        dump($preUpdateEventArgs->getOldValue('mandates') == $preUpdateEventArgs->getNewValue('mandates'));die;
        dump('laREM old');
        dump($preUpdateEventArgs->getOldValue('tags'), 'new', $preUpdateEventArgs->getNewValue('tags'));
        dump('elected old');
        dump($preUpdateEventArgs->getOldValue('mandates'), 'new', $preUpdateEventArgs->getNewValue('mandates'));
        die;

        if (null === $this->mandatesBeforeUpdate) {
            $this->mandatesBeforeUpdate = $preUpdateEventArgs->getOldValue('mandates');
        }

        if (null === $this->tagsBeforeUpdate) {
            $this->tagsBeforeUpdate = $preUpdateEventArgs->getOldValue('tags');
        }
    }

    public function postUpdate(Adherent $adherent): void
    {
        // Update author category for adherent's ideas
        if ($adherent->isElected() != $this->beforeUpdate->isElected()
            || $adherent->isLaREM() != $this->isLaREMBeforeUpdate) {
            $this->ideaRepository->updateAuthorCategoryForIdeasOf($adherent);
        }
    }
}
