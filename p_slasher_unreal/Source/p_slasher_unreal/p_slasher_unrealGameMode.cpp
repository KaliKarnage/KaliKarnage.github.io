// Copyright Epic Games, Inc. All Rights Reserved.

#include "p_slasher_unrealGameMode.h"
#include "p_slasher_unrealCharacter.h"
#include "UObject/ConstructorHelpers.h"

Ap_slasher_unrealGameMode::Ap_slasher_unrealGameMode()
	: Super()
{
	// set default pawn class to our Blueprinted character
	static ConstructorHelpers::FClassFinder<APawn> PlayerPawnClassFinder(TEXT("/Game/FirstPerson/Blueprints/BP_FirstPersonCharacter"));
	DefaultPawnClass = PlayerPawnClassFinder.Class;

}
