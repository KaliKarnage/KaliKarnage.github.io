// Fill out your copyright notice in the Description page of Project Settings.

#include "Enemy_AIController.h"
#include "Enemy.h"

AEnemy_AIController::AEnemy_AIController(FObjectInitializer const& ObjectInitializer)
{
	PerceptionComponent = CreateDefaultSubobject<UAIPerceptionComponent>(TEXT("PerceptionComponent"));

	PerceptionComponent->OnPerceptionUpdated.AddDynamic(this, &AEnemy_AIController::OnPerceptionUpdated);
}

void AEnemy_AIController::OnPossess(APawn* const InPawn)
{
	Super::OnPossess(InPawn);
	if (AEnemy* const Enemy = Cast<AEnemy>(InPawn))
	{
		// Using the getter function to access the BehaviorTree
		if (UBehaviorTree* const BehaviorTree = Enemy->GetBehaviorTree())
		{
			UBlackboardComponent* BlackboardComponent;
			UseBlackboard(BehaviorTree->BlackboardAsset, BlackboardComponent);
			Blackboard = BlackboardComponent;
			RunBehaviorTree(BehaviorTree);
		}
	}
}

void AEnemy_AIController::OnPerceptionUpdated(const TArray<AActor*>& UpdatedActors)
{
	for (AActor* Actor : UpdatedActors)
	{
		if (Actor->IsA(ACharacter::StaticClass()))
		{
			if (DetectedPlayer)
			{
				FVector PlayerLocation = DetectedPlayer->GetActorLocation();

				GetBlackboardComponent()->SetValueAsVector("PlayerLocation", PlayerLocation);

				GetBlackboardCOmponent()->SetValueAsBool("HasDetectedPlayer", true);
			}
		}
	}
}
