
# Unmobile for Chrome

Unmobile is a Chrome extension that automatically redirects from
mobile websites (such as http://en.m.wikipedia.org/wiki/SpaceX) to the
desktop countertop (http://en.wikipedia.org/wiki/SpaceX, note the
missing 'm').

# [Download](https://github.com/zlsa/unmobile/blob/master/unmobile.crx?raw=true)

To install, follow these steps:

1. Navigate to `chrome:extensions`
2. Download the extension from
   [here](https://github.com/zlsa/unmobile/blob/master/unmobile.crx?raw=true)
3. Drag the downloaded file into the `chrome:extensions` tab
4. ???
5. PROFIT

# Under the hood

Whenever the URL of any tab changes, Unmobile's event page checks the
URL against all of the regular expressions in its redirect list. If
any of them match, the hostname (`en.m.wikipedia.org`) is replaced
with the non-mobile version (`en.wikipedia.org`) with a regular
expression defined in the list; the tab's URL is then replaced with
the new URL.

Every day, Unmobile will attempt to download and update itself with
the latest list from GitHub (see redirect.json).

# Contributing

If you have any contributions to the codebase or the redirect list,
fork and submit a pull request. Thanks!

# License

CC-BY 3.0.

