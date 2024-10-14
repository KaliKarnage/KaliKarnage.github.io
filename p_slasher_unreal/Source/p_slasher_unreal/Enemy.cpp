// Fill out your copyright notice in the Description page of Project Settings.


#include "Enemy.h"


// Sets default values
AEnemy::AEnemy()
{
	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	//Health Variables
	Health = 100;
	MaxHealth = 100;
	HealthRegenRate = 1;
	HealthRegenAmount = 1;
	HealthRegenCooldown = 1;

	//Movement Variables
	WalkSpeed = 100;

	//State Variables
	bIsStunned = false;
}

// Called when the game starts or when spawned
void AEnemy::BeginPlay()
{
	Super::BeginPlay();

}

// Called every frame
void AEnemy::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void AEnemy::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

void AEnemy::RegenHealth(float DeltaTime)
{
	if (Health < MaxHealth)
	{
		HealthRegenCooldown -= DeltaTime;
		if (HealthRegenCooldown <= 0)
		{
			Health += HealthRegenAmount;
			HealthRegenCooldown = HealthRegenRate;
			UE_LOG(LogTemp, Log, TEXT("Current Health is: %f"), Health);
		}
	}
	else
	{
		UE_LOG(LogTemp, Log, TEXT("Enemy Health is full"));
	}
}

float AEnemy::TakeDamage(float DamageAmount, FDamageEvent const& DamageEvent, AController* EventInstigator, AActor* DamageCauser)
{
	// Your damage handling logic here
	return Super::TakeDamage(DamageAmount, DamageEvent, EventInstigator, DamageCauser);
}


//Function to stun the enemy temporarily.
void AEnemy::Stun()
{
	bIsStunned = true;
	UE_LOG(LogTemp, Log, TEXT("Enemy is Stunned"));
}

//Might get rid of this function. Enemies are much scarier when they don't die.
void AEnemy::Die()
{
	if (Health <= 0)
	{
		UE_LOG(LogTemp, Log, TEXT("Enemy is Dead"));
	}
	
}
