import { parsePackages, populateReverseDependencies } from "./package_parser"

const inputSinglePackage =
  `Package: libws-commons-util-java
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 101
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 1.0.1-7
Description: Common utilities from the Apache Web Services Project
 This is a small collection of utility classes, that allow high
 performance XML processing based on SAX.
Original-Maintainer: Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>
Homepage: http://ws.apache.org/commons/util/`

const inputMultiplePackages =
  `Package: libws-commons-util-java
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 101
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 1.0.1-7
Description: Common utilities from the Apache Web Services Project
 This is a small collection of utility classes, that allow high
 performance XML processing based on SAX.
Original-Maintainer: Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>
Homepage: http://ws.apache.org/commons/util/

Package: python-pkg-resources
Status: install ok installed
Priority: optional
Section: python
Installed-Size: 175
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Source: distribute
Version: 0.6.24-1ubuntu1
Replaces: python2.3-setuptools, python2.4-setuptools
Provides: python2.6-setuptools, python2.7-setuptools
Depends: python (>= 2.6), python (<< 2.8)
Suggests: python-distribute, python-distribute-doc
Conflicts: python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)
Description: Package Discovery and Resource Access using pkg_resources
 The pkg_resources module provides an API for Python libraries to
 access their resource files, and for extensible applications and
 frameworks to automatically discover plugins.  It also provides
 runtime support for using C extensions that are inside zipfile-format
 eggs, support for merging packages that have separately-distributed
 modules or subpackages, and APIs for managing Python's current
 "working set" of active packages.
Original-Maintainer: Matthias Klose <doko@debian.org>
Homepage: http://packages.python.org/distribute
Python-Version: 2.6, 2.7

Package: tcpd
Status: install ok installed
Multi-Arch: foreign
Priority: optional
Section: net
Installed-Size: 132
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: tcp-wrappers
Version: 7.6.q-21
Replaces: libwrap0 (<< 7.6-8)
Depends: libc6 (>= 2.4), libwrap0 (>= 7.6-4~)
Description: Wietse Venema's TCP wrapper utilities
 Wietse Venema's network logger, also known as TCPD or LOG_TCP.
 .
 These programs log the client host name of incoming telnet,
 ftp, rsh, rlogin, finger etc. requests.
 .
 Security options are:
  - access control per host, domain and/or service;
  - detection of host name spoofing or host address spoofing;
  - booby traps to implement an early-warning system.
Original-Maintainer: Marco d'Itri <md@linux.it>`

const inputWithCopmplexDescription =
  `Package: adduser
Status: install ok installed
Multi-Arch: foreign
Priority: required
Section: admin
Installed-Size: 568
Maintainer: Ubuntu Core Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 3.113ubuntu2
Replaces: manpages-it (<< 0.3.4-2), manpages-pl (<= 20051117-1)
Depends: perl-base (>= 5.6.0), passwd (>= 1:4.0.12), debconf | debconf-2.0
Recommends: ecryptfs-utils (>= 67-1)
Suggests: liblocale-gettext-perl, perl-modules
Conffiles:
 /etc/deluser.conf 773fb95e98a27947de4a95abb3d3f2a2
Description: add and remove users and groups
 This package includes the 'adduser' and 'deluser' commands for creating
 and removing users.
 .
  - 'adduser' creates new users and groups and adds existing users to
    existing groups;
  - 'deluser' removes users and groups and removes users from a given
    group.
 .
 Adding users with 'adduser' is much easier than adding them manually.
 Adduser will choose appropriate UID and GID values, create a home
 directory, copy skeletal user configuration, and automate setting
 initial values for the user's password, real name and so on.
 .
 Deluser can back up and remove users' home directories
 and mail spool or all the files they own on the system.
 .
 A custom script can be executed after each of the commands.
 .
  Development mailing list:
    http://lists.alioth.debian.org/mailman/listinfo/adduser-devel/
Homepage: http://alioth.debian.org/projects/adduser/
Original-Maintainer: Debian Adduser Developers <adduser-devel@lists.alioth.debian.org>`

const inputWithOptionalDeps =
  `Package: grep
Essential: yes
Status: install ok installed
Priority: required
Section: utils
Installed-Size: 608
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Version: 2.10-1
Provides: rgrep
Depends: dpkg (>= 1.15.4) | install-info
Pre-Depends: libc6 (>= 2.4)
Suggests: libpcre3 (>= 7.7)
Conflicts: rgrep
Description: GNU grep, egrep and fgrep
 'grep' is a utility to search for text in files; it can be used from the
 command line or in scripts.  Even if you don't want to use it, other packages
 on your system probably will.
 .
 The GNU family of grep utilities may be the "fastest grep in the west".
 GNU grep is based on a fast lazy-state deterministic matcher (about
 twice as fast as stock Unix egrep) hybridized with a Boyer-Moore-Gosper
 search for a fixed string that eliminates impossible text from being
 considered by the full regexp matcher without necessarily having to
 look at every character. The result is typically many times faster
 than Unix grep or egrep. (Regular expressions containing backreferencing
 will run more slowly, however.)
Original-Maintainer: Anibal Monsalve Salazar <anibal@debian.org>
Homepage: http://www.gnu.org/software/grep/

Package: install-info
Status: install ok installed
Multi-Arch: foreign
Priority: important
Section: doc
Installed-Size: 218
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: texinfo
Version: 4.13a.dfsg.1-8ubuntu2
Replaces: texinfo (<< 4.13a.dfsg.1-2)
Depends: libc6 (>= 2.14)
Breaks: texinfo (<< 4.13a.dfsg.1-2)
Description: Manage installed documentation in info format
 The install-info utility creates the index of all installed documentation
 in info format and makes it available to info readers.
Original-Maintainer: Debian TeX maintainers <debian-tex-maint@lists.debian.org>

Package: dpkg
Essential: yes
Status: install ok installed
Multi-Arch: foreign
Priority: required
Section: admin
Installed-Size: 5931
Origin: debian
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Bugs: debbugs://bugs.debian.org
Architecture: amd64
Version: 1.16.1.2ubuntu7
Pre-Depends: libbz2-1.0, libc6 (>= 2.14), libselinux1 (>= 1.32), zlib1g (>= 1:1.1.4), coreutils (>= 5.93-1), tar (>= 1.23), xz-utils
Suggests: apt
Breaks: apt (<< 0.7.7), aptitude (<< 0.4.7-1), dpkg-dev (<< 1.15.8), libdpkg-perl (<< 1.15.8), pinfo (<< 0.6.9-3.1), tkinfo (<< 2.8-3.1)
Conffiles:
 /etc/dpkg/dpkg.cfg f4413ffb515f8f753624ae3bb365b81b
 /etc/dpkg/dpkg.cfg.d/multiarch e018c53338191b34f943e2b38e160d1a
 /etc/logrotate.d/dpkg 782ea5ae536f67ff51dc8c3e2eeb4cf9
 /etc/alternatives/README 69c4ba7f08363e998e0f2e244a04f881
 /etc/cron.daily/dpkg b6b8dc21210ea50db7cc4636f521758f
Description: Debian package management system
 This package provides the low-level infrastructure for handling the
 installation and removal of Debian software packages.
 .
 For Debian package development tools, install dpkg-dev.
Homepage: http://wiki.debian.org/Teams/Dpkg
Original-Maintainer: Dpkg Developers <debian-dpkg@lists.debian.org>`

test('parsed package has some of the expected properties', () => {
  const input = inputSinglePackage
  const parsed = parsePackages(input)

  expect(parsed.length).toBe(1)
  expect(parsed[0].Package).toBeDefined()
  expect(parsed[0].Package).toBe('libws-commons-util-java')
})

test('multiline field is concatenated into a single string', () => {
  const input = inputSinglePackage
  const parsed = parsePackages(input)

  expect(parsed[0].Description).toBeDefined()
  expect(parsed[0].Description).toBe('Common utilities from the Apache Web Services Project\n' +
    'This is a small collection of utility classes, that allow high\n' +
    'performance XML processing based on SAX.')
})

test('multiple packages are succesfully parsed', () => {
  const input = inputMultiplePackages
  const parsed = parsePackages(input)

  expect(parsed.length).toBe(3)
  expect(parsed[0].Package).toBe('libws-commons-util-java')
  expect(parsed[1].Package).toBe('python-pkg-resources')
  expect(parsed[2].Package).toBe('tcpd')
})

test('periods in multiline strings are outupt as empty lines', () => {
  const input = inputWithCopmplexDescription
  const parsed = parsePackages(input)
  const description = parsed[0].Description.split('\n')

  expect(description[3]).not.toBe('.')
  expect(description[3]).toBe('')
})

test('package dependency versions are removed from dependencies', () => {
  const input = inputWithCopmplexDescription
  const parsed = populateReverseDependencies(parsePackages(input))

  expect(parsed[0].Depends).toBeDefined()
  expect(parsed[0].Depends).toEqual(['perl-base', 'passwd', 'debconf | debconf-2.0'])
})

test('reverse dependencies are populated', () => {
  const input = inputWithOptionalDeps
  const parsed = populateReverseDependencies(parsePackages(input))

  const dpkg = parsed.find(pkg => pkg.Package === 'dpkg')
  const iinfo = parsed.find(pkg => pkg.Package === 'install-info')

  expect(dpkg.Dependents).toBeDefined()
  expect(dpkg.Dependents).toEqual(['grep'])
  
  expect(iinfo.Dependents).toBeDefined()
  expect(iinfo.Dependents).toEqual(['grep'])
})
