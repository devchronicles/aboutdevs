Site map
===

- `/`: Displays the search bar and instructions.
- `/?q=[query]`: Displays a list of profiles that match the given query regardless of region.
- `/stats`: Displays the top 10 queries and the top 10 queries with less than X results.
- `/[user]`: Displays the profile of the given user.
- `/s/[state]/[city]`: Displays a list of profiles with the number of profiles in that activity.
- `/s/[state]/[city]?q=[query]`: Displays a list of profiles that match the given query in the given city.
- `/s/[state]/[city]/stats`: Displays the top 10 queries and the top 10 queries with less than X results.
- `/s/[state]/[city]/[activity]`: Displays a list of profiles in the given activity and city.
- `/s/[state]/[city]/[activity]/?q=[query]`: Displays a list of profiles that match the given query in the given activity in the given city.
- `/i`: Displays a list of states with the number of profiles in that state.
- `/i/[state]`: Displays a list of cities with the number of profiles in that city.
- `/i/[state]/[city]`: Displays a list of activities  with the number of profiles in that activity and city.
- `/i/[state]/[city]/[activity]`: Displays a list of profiles  in the given activity and city.

General rules
---

- `/s` queries represent search queries and the results are always profiles.
- `/i` queries represent index queries and the results will always be the next children of the given division.
- Profiles in `/s` queries are shown as a full cards with a link to the profile.
- Profile in `/i` queries are shown as lines with a link to the profile.