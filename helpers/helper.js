function showDoctorName(input) {
  if (input === null) {
    return "-"
  } else {
    return input.firstName
  }
}

function shortValue(input) {
  if (input !== undefined) {
    if (input.length > 20) {
      return `${input.slice(0, 17)}...`
    }
    else {
      return input
    }
  }
}

module.exports = {
  showDoctorName,
  shortValue
}