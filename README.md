# harvard-data-map

Created with CodeSandbox

Requirements

- map shrinks on initial click v1 [done]
- color in state fill value based on death rate [done]
- map data + fill colors change when user clicks on different years [done]
- when user hovers over state, user sees tooltip with death rate (?) and prompt to click on state for more info (?)
- when user clicks on state:
- - user sees text and data visualizations for the given state, below the map [done]
- - a state specific hash is added to url / window.location [done]

- when user visits state specific hash url, user sees text and data visualizations for the given state, below the map [done]

ToDos

- determine hover state fill color [done]
- determine clicked state fill color [done]
- refactor state data so each state's year key has separate key for both deaths and zone [done]

- handle edge case if url has an invalid hash value

Nice To Haves

- consider refactoring the remove 'active' class using a closure?
