using System;
public class TaxEngine
{
    public void Compute(TaxPayer taxPayer, string category, Func<TaxPayer, double> calculator)
    {
        double taxAmount = calculator(taxPayer);

        Console.WriteLine("========= TAX COMPUTATION =========");
        Console.WriteLine("Name     : " + taxPayer.Name);
        Console.WriteLine("Category : " + category);
        Console.WriteLine("Tax      : " + taxAmount);
        Console.WriteLine("---------------------------------");
        Console.WriteLine();
    }
}
public class TaxPayer
{
    public int TaxPayerId { get; set; }
    public string Name { get; set; }
    public double Income { get; set; }
    public double Surcharge { get; set; }
}

public class DefaultSolution
{
    public static void Main()
    {
        TaxPayer taxPayer = new TaxPayer
        {
            TaxPayerId = 801,
            Name = "Ravi",
            Income = 800000,
            Surcharge = 20000
        };

        Func<TaxPayer, double> individualTaxRule = tp => tp.Income * 0.10;

        Func<TaxPayer, double> businessTaxRule = tp => (tp.Income * 0.15) + tp.Surcharge;

        Func<TaxPayer, double> seniorTaxRule = tp => tp.Income * 0.05;

        TaxEngine engine = new TaxEngine();

        engine.Compute(taxPayer, "Individual", individualTaxRule);
        engine.Compute(taxPayer, "Business", businessTaxRule);
        engine.Compute(taxPayer, "Senior Citizen", seniorTaxRule);
    }
}
