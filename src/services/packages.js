import axios from 'axios'

import { parsePackages, populateReverseDependencies } from '../util/package_parser'

let packages = []
const fetch = async onFinished => {
  try {
    const serverPackages = await axios.get(`${process.env.PUBLIC_URL}/dpkg/status`)
    const parsed = parsePackages(serverPackages.data)
    const populated = populateReverseDependencies(parsed)
    packages = populated
  } catch (e) {
    console.error(e)
  }
  onFinished()
}

const getAll = () => {
  return packages;
}

const findById = id => {
  return packages.find(({ id: pkgId }) => id === pkgId)
}

const findByName = name => {
  return packages.find(({ Package: pkgName }) => name === pkgName)
}

export default {
  fetch,
  getAll,
  findById,
  findByName
}

