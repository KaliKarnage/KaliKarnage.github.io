#workflow
Author: #Brandon 
Date 12 September 2024

The GitHub Project Board will act as our project management tool to make sure issues are well understood and being completed. 
## Columns 
---
We will use 5 columns to organize issues:
1. Design
	- The Design column will only consist of a 'Design' issue which will be design documents that exist in the obsidian. All other (non-design) issues will reference a design issue that will help engineers find necessary context to their issue.
2. Backlog
	- The Backlog column exists to contain issues that are on a lower priority or later timeline for a given sprint/milestone. These issues may or may not be assigned, and issues may be added to the backlog during the process of the milestone.
3. To Do
	- The To Do column exists to show what issue any given person is working on. Each person should have only 1 issue (assigned to them) in the To Do column. If they finish an issue, they should grab a new issue from the backlog. If there are no issues fitting for the individual, they should notify their project manager and relax knowing they've done a good job.
4. In Progress
	- The In Progress column exists to show issues currently in PR pending status. 
5. In Review
	- Tasks pending manager approval (If applicable)
6. Done
	- When an issue in the In Progress column has its respective pull request approved, the issue should automatically be moved to the Done column signifying the issue is complete.

## Working on Issues and Designs
---
Working as a engineer will mean referencing designs specified in the Obsidian. If an issue is not doable due to lack of information/detail within the design document, they should notify the respective designer to clear up any questions/add more detail. Notes pertaining to this should be clearly documented in the comments of a given design. You can reference issues to each other in the document, so make sure communication is clear by establishing your design question or void point with the respective issue. For example, this may be an appropriate comment in the comment section of a design issue "the desired interface was not created for me to create this object given in issue #14" where '#14' would be a reference to issue #14.

Working as a designer will mean creating clear and concise designs that articulate relationship and implementation specifics so that engineers can simply read that document and know exactly what they should be doing. Designers will work with their project manager to create issues for the given milestone.

## Milestones
---
We will be creating 'milestones' which will be our prototype deadline. These milestones will feature a specific prototype definition which will help designers articulate the important features for the prototype and help engineers focus on relevant issues. These are dated, so team members and project manager should work together to ensure a milestone deadline is feasible.
## Formatting and Rules
---
Each (non-design) issue should have a reference to a design issue so engineers and developers can have all necessary context. This would look like: 'References: #3' 

Each issue should have a detailed description so there is clear understanding of how to accomplish the issue with the given design reference.

Issues should be simple and focus on one behavior at a time. This allows for additions to main to be small and able to be isolated if bugs arise. 