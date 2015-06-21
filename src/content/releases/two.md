---
template: post.hbs
date: 2015-06-09
title: "NitroPCR Version 0.2.55"
author: "Nik Martin"
---

* Add Pull to Refresh to the main PCR list. Just drag the list down from the top and it will re-fetch the list of PCRs
* Fix a bug where Validating a PCR that comes back valid and then immediately submitting will cause a "This PCR has been modified" error. PCRs are now reloaded automatically if they come back valid.
* (Hopefully) Fix an infrequent crash that can happen if Android kills NitroPCR while it's in the background.
