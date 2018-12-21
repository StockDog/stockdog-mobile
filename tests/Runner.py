import sys
from unittest import TestLoader, TestSuite, TextTestRunner

from authTests.PostUserTests import PostUserTests
from authTests.PostSessionTests import PostSessionTests
from authTests.DeleteSessionTests import DeleteSessionTests
from routesTests.GetChartsTests import GetChartsTests
from routesTests.PostPortfolioTests import PostPortfolioTests
from routesTests.PostTransactionTests import PostTransactionTests


if __name__ == '__main__':
   loader = TestLoader()
   suite = TestSuite(
      (
         loader.loadTestsFromTestCase(PostUserTests),
         loader.loadTestsFromTestCase(PostSessionTests),
         loader.loadTestsFromTestCase(DeleteSessionTests),
         loader.loadTestsFromTestCase(GetChartsTests),
         loader.loadTestsFromTestCase(PostPortfolioTests),
         loader.loadTestsFromTestCase(PostTransactionTests)
      )
   )
   runner = TextTestRunner()
   result = runner.run(suite)
   sys.exit(not result.wasSuccessful())
