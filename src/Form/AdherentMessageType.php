<?php

namespace AppBundle\Form;

use AppBundle\AdherentMessage\AdherentMessageDataObject;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdherentMessageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if ($options['is_creation']) {
            $builder->add('type', AdherentMessageTypeType::class);
        }

        $builder
            ->add('label', TextType::class, [
                'filter_emojis' => true,
            ])
            ->add('subject', TextType::class, [
                'filter_emojis' => true,
            ])
            ->add('content', PurifiedTextareaType::class, [
                'attr' => [
                    'maxlength' => 5000,
                ],
                'filter_emojis' => true,
                'purifier_type' => 'enrich_content',
                'with_character_count' => true,
            ])
            ->add('save', SubmitType::class)
            ->add('next', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'data_class' => AdherentMessageDataObject::class,
                'is_creation' => true,
            ])
            ->setAllowedTypes('is_creation', ['boolean'])
        ;
    }
}
