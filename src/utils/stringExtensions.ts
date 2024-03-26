// eslint-disable-next-line no-extend-native
String.prototype.isEmpty = function () {
  return this.length === 0 || !this.trim()
}

// eslint-disable-next-line no-extend-native
String.prototype.toSeoFriendly = function () {
  return this.toString() // Convert to string
    .normalize('NFD') // Change diacritics
    .replace(/Ğ/g, 'g') // Change TR Character
    .replace(/ğ/g, 'g') // Change TR Character
    .replace(/Ş/g, 's') // Change TR Character
    .replace(/ş/g, 's') // Change TR Character
    .replace(/İ/g, 'i') // Change TR Character
    .replace(/ı/g, 'i') // Change TR Character
    .replace(/I/g, 'i') // Change TR Character
    .replace(/Ç/g, 'c') // Change TR Character
    .replace(/ç/g, 'c') // Change TR Character
    .replace(/Ö/g, 'o') // Change TR Character
    .replace(/ö/g, 'o') // Change TR Character
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, '')
}

export {}
