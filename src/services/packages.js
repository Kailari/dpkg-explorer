const packages = [
  {
    id: 0,
    Package: "libws-commons-util-java",
    Status: "install ok installed",
    Priority: "optional",
    Section: "java",
    InstalledSize: "101",
    Maintainer: "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
    Architecture: "all",
    Version: "1.0.1-7",
    Description: `Common utilities from the Apache Web Services Project
 This is a small collection of utility classes, that allow high
 performance XML processing based on SAX.`,
    OriginalMaintainer: "Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>",
    Homepage: "http://ws.apache.org/commons/util/"
  },
  {
    id: 1,
    Package: "python-pkg-resources",
    Status: "install ok installed",
    Priority: "optional",
    Section: "python",
    InstalledSize: "175",
    Maintainer: "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
    Architecture: "all",
    Source: "distribute",
    Version: "0.6.24-1ubuntu1",
    Replaces: "python2.3-setuptools, python2.4-setuptools",
    Provides: "python2.6-setuptools, python2.7-setuptools",
    Depends: "python (>= 2.6), python (<< 2.8)",
    Suggests: "python-distribute, python-distribute-doc",
    Conflicts: "python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)",
    Description: `Package Discovery and Resource Access using pkg_resources
 The pkg_resources module provides an API for Python libraries to
 access their resource files, and for extensible applications and
 frameworks to automatically discover plugins.  It also provides
 runtime support for using C extensions that are inside zipfile-format
 eggs, support for merging packages that have separately-distributed
 modules or subpackages, and APIs for managing Python's current
 "working set" of active packages.`,
    OriginalMaintainer: "Matthias Klose <doko@debian.org>",
    Homepage: "http://packages.python.org/distribute",
    PythonVersion: "2.6, 2.7"
  },
  {
    id: 2,
    Package: "aaa"
  },
  {
    id: 3,
    Package: "libtext-wrapi18n-perl"
  },
]

const getAll = () => {
  return packages;
}

const findById = id => {
  return packages.find(pkg => pkg.id === id)
}

export default {
  getAll,
  findById
}
