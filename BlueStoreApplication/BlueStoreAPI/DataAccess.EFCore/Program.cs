// See https://aka.ms/new-console-template for more information
using DataAccess.EFCore.Repository;

var encrypt = LoginRepository.Encryption("hhsyuwpkwm276gjsk2654amlp098sg36", "Vinith");

var decrypt = LoginRepository.Decryption("hhsyuwpkwm276gjsk2654amlp098sg36", encrypt);
Console.WriteLine(encrypt+"  "+ decrypt);

Console.ReadLine();
