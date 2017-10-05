---
title: "Contract Lineage"
date: 2017-09-21T19:55:57-06:00
draft: true
---
Writing safe and secure smart contracts is really hard. Inevitably, code will need to be upgraded as vulnerabilities are exposed and new functionality is needed. The best strategies to provide upgradability to contracts is using many different, interconnected contracts that each have simple job within a larger system. For example, one contract will be used to store requests and another will manipulate them. This allows for new functionality to be added to the manipulator while keeping the datastore intact.  Along with this "microservice" architecture, contracts will need to have lineage. As off-chain code interacts with contracts, they will follow a tree of ancestry to the most current descendant. 
