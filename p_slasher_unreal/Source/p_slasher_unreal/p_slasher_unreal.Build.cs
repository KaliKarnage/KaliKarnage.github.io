// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class p_slasher_unreal : ModuleRules
{
	public p_slasher_unreal(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "EnhancedInput", "AIModule", "GameplayTasks", "NavigationSystem"});
	}
}
