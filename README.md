
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

# Changelog

## 0.0.5 (May 16, 2014)

* Fixed regular expression bug. Update your block list to get the fixed version.
* Added button in Options page to report bug.

# Contributing

If you have any contributions to the codebase or the redirect list,
fork and submit a pull request.

## Quirks

`unmobile.crx` (the actual Chrome extension) is stored in this
repository; if you submit a pull request, you shouldn't update this
file (since it's signed with my private key). The icon files (both SVG
and PNG) are distributed; to regenerate the PNG images, run
`convert.sh` in `assets/images/`.

# License

```
Copyright 2014 Jon Ross

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```
