---
title: "Writing a Generic Fuzzy Search Algorithm in Swift"
headline: "Writing a Generic Fuzzy Search Algorithm in Swift"
subhead: Fuzzy searching finds matches even if there are spelling mistakes or slight variations in the search terms. It helps improve search accuracy by understanding what the user is likely looking for.
description: Fuzzy searching finds matches even if there are spelling mistakes or slight variations in the search terms. It helps improve search accuracy by understanding what the user is likely looking for.
date: 2024-02-17
category: insights
author: tom-ludwig
image: https://github.com/activcoding/codeedit.app/assets/806104/e4db5b6a-0214-4cc7-8019-8354f37851aa
---

<img class="full-width ratio-21-9" alt="Search Field" src="https://github.com/activcoding/codeedit.app/assets/806104/e4db5b6a-0214-4cc7-8019-8354f37851aa">

## What is fuzzy search?

A fuzzy search algorithm is designed to find approximate matches for a given search query, rather than requiring an exact match. It takes into account the similarity between the search query and the data being searched, assigning scores to each potential match based on their resemblance. This allows the algorithm to return relevant results even when there are minor discrepancies or typos in the search input.

Let's say you have a list of products, and a user is looking for a "Cozy Sweater." With a fuzzy search algorithm: If they type "Czy Swetr," the fuzzy search considers the similarity and still returns the "Cozy Sweater."

## Different Algorithms

There are many algorithms out there providing fuzzy search capabilities, some of which you may have encountered. 
These include the well-known **Levenshtein Distance**, the **Jaro-Winkler** Distance, **N-Gram** and the **Hamming 
Distance** Algorithm. Additionally, for those in pursuit of speed, two notable options are the **BK Tree** and **Bitmap 
Algorithm**. It's worth noting that the most efficient and fastest fuzzy search algorithms often include keeping an 
index of the data, most likely in the form of a trie.

In our example, we use an algorithm that emphasises matching prefixes and will provide a similarity score. The algorithm is fairly fast and easy to understand.

## Putting search algorithms into practice

Let's start by setting everything up.

Go ahead and create a file called `Models`. As the name implies, this is where we define our data models.
The first one represents a search result:

```swift
struct FuzzySearchMatchResult {
    let weight: Int
    let matchedParts: [NSRange]
}
```

The `weight` is something like a score - the higher, the better.
And the `matchedParts` are the ranges of the string that match the search query. Note that we are using an array of ranges not just one range, because there can be a few characters in between the matched characters. Here is an illustration:  

<figure>
  <img class="rounded-corners" src="https://github.com/activcoding/codeedit.app/assets/806104/6e1ee7d3-4c63-4c15-9f45-15cbe0933708" />
  <figcaption>Search results: 'conviw' query returns ContentView with the highest relevance.</figcaption>
</figure>

Secondly we need to make sure that the data we searching within is case- and accent-insensitive. This is commonly referred to as 'normalising the string'. To achieve this, we need to add two structs:

```swift
struct FuzzySearchCharacter {
    let content: String
    let normalisedContent: String
}
```

And

```swift
struct FuzzySearchString {
    var characters: [FuzzySearchCharacter]
}
```

The first one represents one character, the `content` field holds the original character, while `normalisedContent` steps in as its case- and accent-insensitive counterpart.

And the FuzzySearchString represents a whole word, essentially an array of characters. Here is a representation of the frensh word summer: "été":

<figure>
  <img class="rounded-corners" src="https://github.com/activcoding/codeedit.app/assets/806104/4fecb94f-f2b5-4a83-948a-84f12feddafc" />
  <figcaption>Representation of the word 'été' with normalized characters</figcaption>
</figure>

## Normalise Words

In order to normalise words, we can create an extension for Strings. Create a new file called: `String+Normalise.swift`. This naming convention enables others to quickly understand the purpose of the file.

Within the file, you'll need to create an extension for String to use the functionality later.

```swift
extension String {
    func normalise() -> [FuzzySearchCharacter] {
        return self.lowercased().map { char in
	    guard let data = String(char).data(using: .ascii, allowLossyConversion: true), let normalisedCharacter = String(data: data, encoding: .ascii) else {
	        return FuzzySearchCharacter(content: String(char), normalisedContent: String(char))
            }

	    return FuzzySearchCharacter(content: String(char), normalisedContent: normalisedCharacter)
    	}
    }
}
```

In this function, the String it's called on, is first converted to lowercase. Then, it will convert it to data using the ascii encoding and allow lossy conversion, which means that we lose data. Through losing data, we make the String accent-insensitive.
The function then returns an array of `FuzzySearchCharacter` objects, representing the original and normalised content for each character.

### Matching Prefix

Now we need to find out if the search query and the string we're comparing it against match. To achieve this, we can write another extension: `hasPrefix`. For better understanding, let's look at the illustration:

<figure>
  <img class="rounded-corners" src="https://github.com/activcoding/codeedit.app/assets/806104/f96a4e4f-8821-4989-a744-266cc47b8e8e" />
  <figcaption>Depicts iterations checking prefixes for a match.</figcaption>
</figure>

The function simply checks for matching characters from a specified starting index. This functionality will prove useful in later.

```swift
extension String {
    func hasPrefix(prefix: FuzzySearchCharacter, startingAt index: Int) -> Int? {
        guard let stringIndex = self.index(self.startIndex, offsetBy: index, limitedBy: self.endIndex) else {
            return nil
        }
        let searchString = self.sufflix(from: stringIndex)
        for prefix in [prefix.content, prefix.normalisedContent] where searchString.hasPrefix(prefix) {
            return prefix.count
        }
        return nil
    }
}
```

Let's go through the code step by step:

1. We accept a prefix that is of type `FuzzySearchCharacter`, this is the data against which we test our search 
query. And we need a starting index.  
2. Verify if the provided index is valid for the search query.  
3. Clip the search query (`self`) to start from the provided starting index.  
4. Iterate through the provided data and check if the prefixes are matching.  
5. If no match is found, return `nil`.  

If this function doesn't seem clear at the moment, it will become clearer as we use it.

### Fuzzy Searchable Protocol

In order to make the Fuzzy Search generic, i.e. make it applicable to every data type, we have to write a protocol.
Other data types can adopt this protocol, enabling them to become fuzzy searchable.

```swift
protocol FuzzySearchable {
    var searchableString: String { get }

    func fuzzyMatch(query: String, characters: FuzzySearchString) -> FuzzySearchMatchResult
}
```

If a data type wants to conform to `FuzzySearchable`, it only needs to add three simple lines. For instance, consider this Model:

```swift
struct Books: FuzzySearchable {
    var title: String
    var releaseDate: Date

    var searchableString: String {
        title
    }
}
```

This approach enables us to use whatever is provided as the searchable string for comparison against the search query.
At this point, you might be wondering why the `fuzzyMatch` function is not implemented in the example `Books` struct.
However, we can address this by writing an extension on `FuzzySearchable` that offers a default `fuzzyMatch` function for all data types that adapt to it. This is relatively straightforward compared to other implementations:

```swift
extension FuzzySearchable {
    func fuzzyMatch(query: String, characters: FuzzySearchString) -> FuzzySearchMatchResult {
        [...]
    }
}
```

This function takes the query, i.e., the search term, and the characters of a word as arguments. The characters represent the string that we compare the search query against. We use `FuzzySearchString` instead of a simple String, because we want a case- and accent-insensitive search.

The function then returns a `FuzzySearchMatchResult`, which just holds information about the search result, to be precise it includes `let weight: Int` and `let matchedParts: [NSRange]`.

Now let's implement the function:

```swift
extension FuzzySearchable {
    func fuzzyMatch(query: String, characters: FuzzySearchString) -> FuzzySearchMatchResult {
        let compareString = characters.characters // the string we compare against
        let searchString = query.lowercased() // make the query case-insensitive

        var totalScore = 0 // represents the weight of the match
        var matchedParts = [NSRange]() // Ranges that match compareString and searchString

        // This is always the data for one match
        var patternIndex = 0
        var currentScore = 0
        var currentMatchedPart = NSRange(location: 0, length: 0)

        for (index, character) in compareString.enumerated() {
            if let prefixLength = searchString.hasPrefix(prefix: character, startingAt: patternIndex) {
                // A match was found, so we increment the score and the range
                patternIndex += prefixLength
                currentScore += 1
                currentMatchedPart.length += 1
            } else {
                // No match was found
                currentScore = 0
                if currentMatchedPart.length != 0 {
                    matchedParts.append(currentMatchedPart)
                }
                currentMatchedPart = NSRange(location: index + 1, length: 0)
            }
            totalScore += currentScore
        }

        if currentMatchedPart != 0 {
            matchedParts.append(currentMatchedPart)
        }

        if searchString.count == matchedParts.reduce(0, { partialResults, range in 
            range.length + partialResult
        }) {
            return FuzzySearchMatchResult(weight: totalScore, matchedParts: matchedParts)
        } else {
            return FuzzySearchMatchResult(weight: 0, matchedParts: [])
        }
    }
}
```

Here is where the magic happens.

First of course we extract the compare string from the provided `FuzzySearchString`, then we use a lowercased version of the search query.

With the necessary preparations in place, we set up our variables to track the matching process. The `totalScore` variable holds the cumulative weight of matches found within an object, while the `matchedParts` variable is an array of ranges representing the specific regions within the object that match the search query.

The next variables are used for each sub-match in the compareString.

`patternIndex`: This is the starting index of the current sub-match. It is incremented each time a matching character is found.

`currentScore`: This is the score for all sub-matches within the compareString. It is incremented each time a sub-match is found.

`currentMatchedPart`: This is a range that represents one sub-match. It stores the starting and ending indices of the sub-match.

We now iterate through the compare string using a `for` loop with `.enumerated()` to keep track of the current index. If we find a matching prefix, we can go ahead an increment all values for the current match. The parameters passed to the extension are the characters being compared and the `patternIndex`. It's important to use `patternIndex` instead of the index of the `for` loop to avoid double-counting. When a matching prefix is found, we update the `patternIndex` and shift it to the right, i.e. increase it, preventing the same letters from being matched twice. Additionally, we increment the `score` and adjust the `currentMatchedPart` to mark the correct range.

Then we add the `currentScore` to the `totalScore`.

However, when the prefixes don't align, we reset the `currentScore` to 0. In the scenario where there was a preceding match, indicated by a non-zero length of `currentMatchedPart`, we add the matched range to the `matchedParts`. Subsequently, we reset the `currentMatchedParts` length to 0, while simultaneously shifting the location to the right.

Upon completion of the `for` loop, we check again if the last iteration was still a match and if yes, we append the `currentmatchPart` to the `matchedParts`.

Finally, we make a comparison between the length of the `searchString` and the total length of the found ranges. If these lengths match, we return a `FuzzySearchMatchResult` containing the calculated `totalScore` and the `matchedParts`. However, if the lengths differ, we return a weight of 0 along with an empty array

You might be wondering whether you need to manually call this function and provide the `FuzzySearchString`. Fortunately, that's not necessary. We can just create two concise functions that make the process a bit simpler.

```swift
func normaliseString() -> FuzzySearchString {
	return FuzzySearchString(characters: searchableString.normalise())
}
```

This function returns the normalised version of the searchableString that is provided by the object that it is called from.

```swift
func fuzzyMatch(query: String) -> FuzzySearchMatchResult {
    let characters = normaliseString()
	
    return fuzzyMatch(query: query, characters: characters)
}
```

Subsequently, we simply transform the characters into their normalised counterparts and invoke the fuzzyMatch function. This, in turn, provides us with the `FuzzySearchMatchResult`.

### Fuzzy Search Extension

Now, let's make arrays fuzzy-searchable by writing an extension for them. This way, they can easily be searched using our fuzzy match functionality.

```swift
extension Collection where Iterator.Element: FuzzySearchable {
    func fuzzySearch(query: String) -> [(result: FuzzySearchmatchResult), item: Iterator.Element)] {
        return map {
            (result: $0.fuzzyMatch(query: query), item: $0)
        }.filter {
            $0.result.weight > 0
        }.sorted {
            $0.result.weight > $1.result.weight
        }
    }
}
```

To enable fuzzy searching, we extend Swift's `Collection` with a handy `fuzzySearch` method. However, to ensure compatibility, we limit this extension to collections whose elements conform to the `FuzzySearchable` protocol we defined earlier.

When using this method, you simply provide a search `query`. The function then iterates over the array, invoking the `fuzzyMatch` method on each element. The `fuzzyMatch` method, as you recall, provides a weight for every element. We leverage these weights to filter out elements with a score less than or equal to 0. Finally, we sort the array, placing the element with the highest score at the top.

*Additionally, for a slight performance boost, consider utilising a `concurrentMap` from the `CollectionConcurrencyKit` package.*

### Usage

In CodeEdit we for one use the algorithm to provide a quick open overlay that lets user find files quickly. To apply fuzzy search to an array of URLs, you can easily extend the data type `URL` to conform to the `FuzzySearchable` protocol.

```swift
extension URL: FuzzySearchable {
    var searchableString: String {
        return self.lastPathComponent
    }
}
```

If you've created your custom data type, making it compatible with fuzzy search is a breeze—simply ensure it conforms to the `FuzzySearchable` protocol, as shown here:

```swift
struct Users: Identifiable, Codable, FuzzySearchable {
    var id: Int
    var name: String
    var description: String
 
    var searchableString: String {
        return name
    }
}
```

And now we can just use the fuzzy search function:

```swift
@State private var searchText: String = ""
var users: [Users] = getUsers()
var sortedUsers: [Users] {
    if searchText.isEmpty {
    	return users
    } else {
    	return users.fuzzySearch(query: searchText) map {
            $0.item
        }
    }
}
```

## Conclusion

Implementing a fuzzy search algorithm is relatively straightforward, yet it significantly enhances the overall user 
experience.

If you prefer to grab the entire code at once, you can find it conveniently shared in this [gist](https://gist.github.com/activcoding/548e093cda10ea323775c78ba689e303). I also have a repository with a few implementations of the fuzzy search algorithm. It includes an option for utilizing fuzzy search with cached data, providing a slight performance boost. Check out the [Demo Repository](https://github.com/activcoding/FuzzySearch-with-SwiftUI) for a closer look. You can also check out the implementation in [CodeEdit](https://github.com/CodeEditApp/CodeEdit).

If you still have questions, feel free to contact me.  

Happy coding!  
