<?php

namespace AppBundle\AdherentMessage;

use AppBundle\Entity\AdherentMessage\AdherentMessageInterface;
use Symfony\Component\Validator\Constraints as Assert;

class AdherentMessageDataObject
{
    /**
     * @var string|null
     *
     * @Assert\NotBlank
     */
    private $type;

    /**
     * @var string|null
     *
     * @Assert\NotBlank
     * @Assert\Length(min="3", max="255")
     */
    private $label;

    /**
     * @var string|null
     *
     * @Assert\NotBlank
     * @Assert\Length(min="3", max="255")
     */
    private $subject;

    /**
     * @var string|null
     *
     * @Assert\NotBlank
     * @Assert\Length(min="3", max="5000")
     */
    private $content;

    public static function createFromEntity(AdherentMessageInterface $message): self
    {
        $dataObject = new self();

        $dataObject->setType(AdherentMessageTypeEnum::getType(\get_class($message)));
        $dataObject->setSubject($message->getSubject());
        $dataObject->setLabel($message->getLabel());
        $dataObject->setContent($message->getContent());

        return $dataObject;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): void
    {
        $this->type = $type;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): void
    {
        $this->label = $label;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): void
    {
        $this->subject = $subject;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): void
    {
        $this->content = $content;
    }
}
