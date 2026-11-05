"""Unit tests for the rule checks. No network. Run: python3 -m unittest discover evals"""

import unittest

from checks import run_rules


class RuleChecks(unittest.TestCase):
    def test_good_line_passes(self):
        self.assertEqual(run_rules("My frosting is ripped and I regret nothing."), {})

    def test_too_long(self):
        line = "I " + "really " * 15 + "love eggs."
        self.assertIn("short", run_rules(line))

    def test_emoji(self):
        self.assertIn("no_emoji", run_rules("I am so swole 💪"))

    def test_hashtag(self):
        self.assertIn("no_hashtags", run_rules("I lift, therefore I cake. #gains"))

    def test_wrapping_quotes(self):
        self.assertIn("no_wrapping_quotes", run_rules('"I am the beefiest cake."'))
        self.assertIn("no_wrapping_quotes", run_rules("“I am buff.”"))

    def test_apostrophe_is_not_a_quote(self):
        self.assertNotIn("no_wrapping_quotes", run_rules("I'm buff, y'all"))

    def test_third_person_fails(self):
        self.assertIn("first_person", run_rules("The cake flexes its frosting."))

    def test_empty(self):
        self.assertIn("not_empty", run_rules("   "))


if __name__ == "__main__":
    unittest.main()
