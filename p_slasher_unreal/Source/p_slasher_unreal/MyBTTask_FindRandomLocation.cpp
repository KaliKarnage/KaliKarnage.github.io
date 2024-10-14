// Fill out your copyright notice in the Description page of Project Settings.


#include "MyBTTask_FindRandomLocation.h"
#include "Enemy_AIController.h"
#include "BehaviorTree/BlackboardComponent.h"
#include "NavigationSystem.h"
#include "AIController.h"
#include "GameFramework/Actor.h"


UMyBTTask_FindRandomLocation::UMyBTTask_FindRandomLocation(FObjectInitializer const& ObjectInitializer)
{

	NodeName = "Find Random Location";

}

EBTNodeResult::Type UMyBTTask_FindRandomLocation::ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory)
{
	if (auto* const cont = Cast<AEnemy_AIController>(OwnerComp.GetAIOwner()))
	{
		if (auto* const enemy = cont->GetPawn())
		{
			auto const Origin = enemy->GetActorLocation();

			if (auto* const navSys = UNavigationSystemV1::GetCurrent(GetWorld()))
			{
				FNavLocation loc;
				if (navSys->GetRandomPointInNavigableRadius(Origin, SearchRadius, loc))
				{
					OwnerComp.GetBlackboardComponent()->SetValueAsVector(GetSelectedBlackboardKey(), loc.Location);
					
				}

				FinishLatentTask(OwnerComp, EBTNodeResult::Succeeded);
				return EBTNodeResult::Succeeded;
			}
		}
	}
	return EBTNodeResult::Failed;
}