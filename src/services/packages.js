import axios from 'axios'

import { parsePackages } from '../util/package_parser'

let packages = []
const fetch = async onFinished => {
  try {
    const serverPackages = await axios.get(`${process.env.PUBLIC_URL}/dpkg/status`)
    const parsed = parsePackages(serverPackages.data)
    packages = parsed
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

export default {
  fetch,
  getAll,
  findById
}

