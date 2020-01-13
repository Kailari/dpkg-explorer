// -------------------------------------------------------------------------------
// Exported
// -------------------------------------------------------------------------------

/**
 * Parses package information from a dpkg/status
 * 
 * @param {string} data - raw data read from dpkg/status as a single, long string
 */
export const parsePackages = data => {
  return packagesAsSeparateStrings(data)
    .map(splitEachPropertyToItsOwnLine)
    .map(parsePropertyStringsToPairs)
    .map(combinePropertyPairsToObject)
}

/**
 * Populates the "dependents" -field on given packages
 * 
 * @param {Object[]} packages 
 */
export const populateReverseDependencies = packages => {
  return packages
}


// -------------------------------------------------------------------------------
// Helper methods
// -------------------------------------------------------------------------------

const packagesAsSeparateStrings = data => data.split(/\n\s*\n/gm)

const splitEachPropertyToItsOwnLine = pkgAsString => pkgAsString.split(/\n/)

const parsePropertyStringsToPairs = propertyStrings => propertyStrings
  .reduce(combineMultilineFields, [])
  .map(splitOnFirstColon)
  .filter(isValidKeyAndValue)
  .map(([key, value]) => [key,
    key === 'Depends'
      ? parseDependencies(value)
      : value])
  .map(combineArrayToKeyValuePair)

const combineMultilineFields = (accumulator, propertyString) =>
  isContinuationLine(propertyString)
    ? concatToLastAsNewline(accumulator, propertyString)
    : [...accumulator, propertyString]

const isContinuationLine = line => line.match(/^\s/g)

const concatToLastAsNewline = (accumulator, string) => {
  const processed = cleanUpMultilinePart(string)
  const indexOfLast = accumulator.length - 1
  accumulator[indexOfLast] = accumulator[indexOfLast].concat(`\n${processed}`)
  return accumulator
}

const cleanUpMultilinePart = string => {
  const trimmed = string.trim()
  return trimmed === '.' ? '' : trimmed
}

const splitOnFirstColon = string => [
  string.substring(0, string.indexOf(':')).trim(),
  string.substring(string.indexOf(':') + 1).trim()
]

const isValidKeyAndValue = array =>
  array.length === 2 && isDefinedAndNotEmpty(array[0]) && isDefinedAndNotEmpty(array[1])

const isDefinedAndNotEmpty = string =>
  string !== null && string !== undefined && `${string}`.length > 0

const parseDependencies = dependencyString => {
  return dependencyString
    .split(',')
    .map(removeVersionFromDependencyString)
    .filter(onlyUnique)
}

const removeVersionFromDependencyString = dependency => {
  let bracketIndex = dependency.indexOf('(')
  let endIndex = bracketIndex > -1 ? bracketIndex : dependency.length
  return dependency
    .substring(0, endIndex)
    .trim()
}

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const combineArrayToKeyValuePair = ([key, value]) => ({
  [sanitizeKey(key)]: value
})

const sanitizeKey = key => key.replace('-', '')

const combinePropertyPairsToObject = (properties, id) =>
  properties.reduce((pkg, property) => ({ ...pkg, ...property }), { id: `${id}` })
