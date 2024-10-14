// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "BehaviorTree/Tasks/BTTask_BlackboardBase.h"
#include "BTTask_ChasePlayer.generated.h"

/**
 * 
 */
UCLASS()
class P_SLASHER_UNREAL_API UBTTask_ChasePlayer : public UBTTask_BlackboardBase
{
	GENERATED_BODY()

public:
	// Constructor for UBTTask_ChasePlayer
	explicit UBTTask_ChasePlayer(FObjectInitializer const& ObjectInitializer);

	// ExecuteTask function for UBTTask_ChasePlayer
	virtual EBTNodeResult::Type ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) override;

private:

	UPROPERTY(EditAnywhere, Category = "AI", meta = (AllowPrivateAccess = "true"))
	float ChaseTime = 5.0f;


};
