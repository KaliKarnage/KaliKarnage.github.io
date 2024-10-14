// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "BehaviorTree/BehaviorTree.h"
#include "Enemy.generated.h"

UCLASS()
class P_SLASHER_UNREAL_API AEnemy : public ACharacter
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	AEnemy();

	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	// Getter for BehaviorTree
	UBehaviorTree* GetBehaviorTree() const { return BehaviorTree; }

protected:
	//Behavior Tree declaration. Makes accessible in the editor.
	UPROPERTY(EditAnywhere, BlueprintReadWrite,  Category = "AI", meta = (AllowPrivateAccess = "true"))
	UBehaviorTree* BehaviorTree;

	//Health Variables
	UPROPERTY(EditAnywhere, Category = "Health", meta = (AllowPrivateAccess = "true"))
	float Health;

	UPROPERTY(EditAnywhere, Category = "Health")
	float MaxHealth;

	UPROPERTY(EditAnywhere, Category = "Health")
	float HealthRegenRate;

	UPROPERTY(EditAnywhere, Category = "Health")
	float HealthRegenAmount;

	UPROPERTY(EditAnywhere, Category = "Health")
	float HealthRegenCooldown;

	//Movement Variables
	UPROPERTY(EditAnywhere, Category = "Movement")
	float WalkSpeed;

	//State Variables
	UPROPERTY(EditAnywhere, Category = "State")
	bool bIsStunned;

	//Health Functions
	UFUNCTION(BlueprintCallable, Category = "Health")
	void RegenHealth(float DeltaTime);

	//Movement Functions

	//State Functions
	UFUNCTION(BlueprintCallable, Category = "State")
	void Stun();

	UFUNCTION(BlueprintCallable, Category = "State")
	void Die();

	//AI Functions
	
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;


	// Overrides the base class implementation of TakeDamage to customize how this actor (AEnemy) handles damage.
	//
	// Parameters:
	// - DamageAmount: The amount of damage to apply to this actor (e.g., health reduction).
	// - DamageEvent: Contains additional information about the type of damage (e.g., melee, projectile, fire).
	// - EventInstigator: The controller responsible for the damage, typically the player or AI controller that caused the damage.
	// - DamageCauser: The specific actor that dealt the damage (e.g., a weapon, another character).
	//
	// Returns:
	// - The actual damage applied after any modifications (e.g., resistances, armor).
	//
	// The 'virtual' keyword allows this function to be overridden in derived classes.
	// The 'override' keyword ensures that this function is indeed overriding a base class version (from AActor or a parent class).
	virtual float TakeDamage(float DamageAmount, FDamageEvent const& DamageEvent, AController* EventInstigator, AActor* DamageCauser) override;


};
