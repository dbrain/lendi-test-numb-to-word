# Number to Word API

A bit of a quick hack solution to tasks defined in [README-for-Daniel.md](README-for-Daniel.md).

## How to run the API

```
yarn run start
```

## How to use the API

```
curl -X POST http://localhost:3000/POST/1234567
curl http://localhost:3000/GET
// one million two hundred and thirty four thousand five hundred and sixty seven
```

## What this covers

* Tests pass
* Added tests for millions, and error scenario (larger than millions)
* A absolute MVP API for posting a number, storing, and retrieving as per API described

## What this does not cover

* API documentation
* Really any documentation of anything outside of this README
* The cached number in memory is clearly not a great way to do this in a real API
* API tests
* Numbers larger than millions. Could probably just add to the `scales` array

## API Rules

* POST will 400 if not a valid number, or 500 if too large (via a throw)
  * Could handle the error and instead also make that a 400, but didn't
* POST will 204 (no content) if a valid number that was accepted
* GET will 404 if no POST has occured, otherwise 200 with the text in plain/text form

## How the number part works

Similar to what I started during the live coding test, but got muddled.

* Reverse the input stringified, 123456 => '654321'
  * This allows for applying the scale (hundreds, thousands, so on) looking forward rather than back tracking / having to stress about the length
* Chunk the input into 3 digit parts 654321 => [[6, 5, 4], [3, 2, 1]]
* Iterate over the parts applying the "ones" (6), "tens" (5), "hundreds" (4)
  * Adding an 'and' if hundreds exist, either before tens if set or ones otherwise
* Iterate over the result of the parts with their index to apply the scale
  * "four hundred and fifty six" (0) == no scale (hundred is handled)
  * "one hundred and twenty three" (1) == thousands scale so append thousand
* Remove any unpopulated parts, for e.g. 100000 without filtering would have lingering spaces after the join
* Reverse the parts so they are in the correct order and join to produce string

This could be expanded to support larger numbers by adding to the scale array, but I figured for this test millions is enough/too much given test data is thousands.

## General rant

I kind of MVP'd this whole test. If I wanted to go crazy I may have done something like:

* Made "number-to-word" it's own module
* Documented the API / the number-to-word codebase a bit more
* Built up the API side to be a bit more structured, i.e. you might have a `Service` that handles the specific number routes, rather than a flat file with a listen
* Added some basic API tests
* ... I guess not stored the number in memory, or at least made it handle multiple users. e.g.
  * POST could return an identifer
  * GET could pass identifier
  * Maybe have something working FIFOing the cache so it doesn't eat all of the memory in a DOS scenario



