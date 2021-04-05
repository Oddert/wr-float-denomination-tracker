
|name|desc|affects
|--|--|--|
count-read-list | Get basic details for one or more counts | all (except user_id)
count-read-individual | Get all details for one or more counts | all
count-declare | Register an unverified count | ?
count-create | Register a new count with full access | all
count-update | Update a count | all
count-destroy | delete a count | deleted, deleted_on

|name|desc|affects
|--|--|--|
repository-read-list | Get basic details for one or more repos | name, id, description, updated_on
repository-read-individual | Get all details for one or more repos | all
reposirtory-activate | Toggle the activation of a repo | activated, activated_on, activaed_by, deactivated_on, deactivated_by
repository-create | Create a new repository | all
repository-update | Update repository details | all
repository-destroy | delete a repository | deleted, deleted_on

|name|desc|affects
|--|--|--|
partner-read-list | List basic details for all partners | (get initials), till_number, id
partner-read-individual | Get specific user data for one or more | all
partner-request | Create an un-confirmed new entry | preffered_name, first_name, middle_names, last_name
partner-create | Authorise or create a user | all
partner-update-basic | Change basic details but no critical options | preffered_name, first_name, middle_names, last_name
partner-update-detials | update sensitive details exluding privelage based attrs | Update till_number, pending
partner-update-privaleges | Update privileges | priveleges
partner-delete | Delete a user | deleted
partner-delete-permenant | Perminantly remove record | all
---


0 - Standard User | 1 - Cash Partner |
count-read-list
count-read-individual
count-declare
count-create
count with full
count-update
count-destroy

2 - Manager