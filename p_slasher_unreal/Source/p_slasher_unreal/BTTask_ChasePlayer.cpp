// Fill out your copyright notice in the Description page of Project Settings.


#include "BTTask_ChasePlayer.h"
#include "Enemy_AIController.h"
#include "BehaviorTree/BlackboardComponent.h"
#include "NavigationSystem.h"
#include "AIController.h"
#include "GameFramework/Actor.h"
#include "Kismet/GameplayStatics.h"
#include "GameFramework/Character.h"


UBTTask_ChasePlayer::UBTTask_ChasePlayer(FObjectInitializer const& ObjectInitializer)
{
	NodeName = "Chase Player";
}

EBTNodeResult::Type UBTTask_ChasePlayer::ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory)
{
	if (auto* const cont = Cast<AEnemy_AIController>(OwnerComp.GetAIOwner()))
	{
		if (auto* const enemy = cont->GetPawn())
		{
			if (auto* const player = UGameplayStatics::GetPlayerCharacter(GetWorld(), 0))
			{
				//Get player location
				FVector PlayerLocation = player->GetActorLocation();

				OwnerComp.GetBlackboardComponent()->SetValueAsObject(GetSelectedBlackboardKey(), Cast<AActor>(player));

				FinishLatentTask(OwnerComp, EBTNodeResult::Succeeded);
				return EBTNodeResult::Succeeded;
			}
		}
	}
	return EBTNodeResult::Failed;
}
