# Choppy-Orc-Leaderboard
This is a simple leaderboard comparing speedrunning times for the game Choppy Orc. Users can view leaderboard times and submit their own for verification.

# Instructions
To view the leaderboard, simply load the home page of the site. A table is shown that lists the following information:

- `Rank` - This is the overall rank of the time on the leaderboard compared to the other times that have been submitted.
- `Username` - This is the username of the player that set the time.
- `Time` - This is the time (in seconds) that it took the player to beat the game.
- `Date` - This is the date that the user submitted their time to the leaderboard.
- `Status` - This is the status of the user's time submission. `Pending` means that the user's time is under review. `Verified` means that the user's time was judged to be authentic.

To submit your own time, start by clicking the `Submit Time` button on the home page. This brings the user to a new page with a form requiring the following inputs:

- `Username` - This is the username of the player that set the time. The user can set this as whatever they'd like.
- `Time` - This is the time (in seconds) that it took the player to beat the game. The time should be entered with three decimal places of precision.
- `Screenshot` - This is the screenshot of the end screen upon beating the game, which confirms that the user's reported time is authentic. This screenshot is essential both for submitting and verifying a time.

Once all fields are filled out, the user click's `Submit`. Upon clicking the `Submit` button, the user is met with a message that does one of three things:

- `Success` - Confirms that the user's time submission was successful.
- `Error` - Indicates that the user's time submission was unsuccessful due to an application bug or network interference.
- `Warning` - Tells the user that their form information is invalid in some way (e.g., a negative time was entered, no screenshot was attached, etc.).