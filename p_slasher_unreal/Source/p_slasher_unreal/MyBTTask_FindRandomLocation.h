// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "BehaviorTree/Tasks/BTTask_BlackboardBase.h"
#include "MyBTTask_FindRandomLocation.generated.h"

/**
 * 
 */
UCLASS()
class P_SLASHER_UNREAL_API UMyBTTask_FindRandomLocation : public UBTTask_BlackboardBase
{
	GENERATED_BODY()

public:
	// Constructor for UMyBTTask_FindRandomLocation
	explicit UMyBTTask_FindRandomLocation(FObjectInitializer const& ObjectInitializer);
	// ExecuteTask function for UMyBTTask_FindRandomLocation
	virtual EBTNodeResult::Type ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) override;

private:
	
	UPROPERTY(EditAnywhere, Category = "AI", meta = (AllowPrivateAccess = "true"))
	float SearchRadius = 1500.0f;
	
};
