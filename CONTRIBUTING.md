# Contributing

First off, thank you for considering contributing to steamShark. It's people like you that make steamShark such a great tool.

# Ground Rules
To ensure a positive and productive experience for everyone, please follow these ground rules:
**1.** Be respectful and courteous in all communications. Harassment or inappropriate behavior will not be tolerated.
**2.** Ensure your contributions adhere to the project's coding standards and guidelines.
**3.** Always write clear and concise commit messages.
**4.** Document your changes appropriately to help others understand your work.
**5.** Before making any change, be sure that you create an issue

# Your First Contribution

Hi, if you're new to contributing, welcome!
Here's how you can get started with SteamShark. One of the following tasks might be the right place for you:

* Add a new website to the scam list
* Add a new website to the trust list
* Make a dispute of an scam/trust website
* General contribution

[ ] - Make each guide after.

### Add a New Website to the Scam List

**1.** Check the [scam list](./utils/scam.json) to ensure the website is not already listed.

**2.** Open an issue using the `Add to Scam List` [template](./templates/addScamList.md) and provide as much information as possible:
   - Website URL
   - Reasons why it should be considered a scam (e.g., phishing, malware, fraud reports).
   - Any additional supporting evidence (screenshots, reports, etc.).

**3.** Wait for feedback from maintainers and the community before proceeding with a pull request.

**4.** If approved, add the website to the `scam_list.json` file.

---

### Add a New Website to the Trust List

**1.** Verify that the website is not already on the [trust list](./utils/trust.json).

**2.** Open an issue using the `Add to Trust List` [template](./templates/addTrustList.md) with the following details:
   - Website URL
   - Reasons for considering it trustworthy (e.g., reviews, safe practices).

**3.** Upon approval, add the site to the `trust_list.json` file (or the relevant file).

---

### Dispute a Scam/Trust Classification

**1.** Open an issue with the `Dispute Classification` [template](./templates/disputeClassification.md).

**2.** Clearly explain the classification you are disputing and why.

**3.** Provide evidence or examples supporting your claim.

**4.** Participate in the discussion to resolve the dispute.

---

### General Contributions

For other contributions such as bug fixes, feature suggestions, or documentation improvements:

**1.** Search existing issues to check if your idea or bug report has already been addressed.

**2.** If not, create a new issue describing the bug, enhancement, or idea.

**3.** Follow the general pull request guidelines (see below).

---

## Pull Request Guidelines

**1.** Fork the repository and create your branch:

```
git checkout -b feature/YourFeatureName
```

**2.** Make your changes. Test thoroughly before committing.

**3.** Commit your changes with a descriptive message:

```
git commit -m "Add feature: YourFeatureName"
```

**4.** Push to your fork and submit a pull request:

```
git push origin feature/YourFeatureName
```

**5.** Link your pull request to the relevant issue if applicable.

**6.** Wait for feedback and make any requested changes.

---

## Getting Help

If you need assistance, feel free to ask by creating an issue.

---

We appreciate every contribution, big or small. Thank you for helping to make SteamShark better!