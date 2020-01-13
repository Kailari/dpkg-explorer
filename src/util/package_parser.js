export const parsePackages = data => {
  const packagesAsStrings = data.split(/\n\s*\n/gm)
  const packagesSplit = packagesAsStrings
    .map(string => string.split(/\n/))
    .map(propertyStrings => propertyStrings
      .reduce((accumulator, property) => {
        if (property.match(/^\s/g)) {
          const indexOfLast = accumulator.length - 1
          const line = property.trim()
          const processed = line === '.' ? '' : line

          accumulator[indexOfLast] = accumulator[indexOfLast].concat(`\n${processed}`)
        } else {
          accumulator.push(property)
        }

        return accumulator
      }, [])
      .map(propertyString => [
        propertyString.substring(0, propertyString.indexOf(':')).trim(),
        propertyString.substring(propertyString.indexOf(':') + 1).trim()
      ]))
    .reduce((accumulator, propertyStrings, index) => {
      var pkg = {}
      pkg.id = `${index}`
      propertyStrings.forEach(propertyString => pkg[propertyString[0].replace('-', '')] = propertyString[1])
      accumulator.push(pkg)
      return accumulator
    }, [])
  return packagesSplit
}
